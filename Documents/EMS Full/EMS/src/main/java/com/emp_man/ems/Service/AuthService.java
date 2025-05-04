package com.emp_man.ems.Service;

import com.emp_man.ems.DTOs.LoginRequest;
import com.emp_man.ems.DTOs.LoginResponse;
import com.emp_man.ems.DTOs.SignupRequest;
import com.emp_man.ems.DTOs.PasswordChange;
import com.emp_man.ems.DTOs.UserSettingsDTO;
import com.emp_man.ems.Models.User;
import com.emp_man.ems.Repositories.UserRepository;
import com.emp_man.ems.security.CustomUserDetailsService;
import com.emp_man.ems.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;

@Service
public class AuthService {

    private static final Logger logger = Logger.getLogger(AuthService.class.getName());

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final Set<String> allowedRoles = new HashSet<>(Set.of(
            "HR Administrator", "Department Manager", "Employee"
    ));

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, JwtUtil jwtUtil,
                       CustomUserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    public void signup(SignupRequest request) {
        if (request.getEmail() == null || request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Email and password cannot be empty.");
        }

        if (!allowedRoles.contains(request.getRole())) {
            throw new IllegalArgumentException("Invalid role provided.");
        }

        Optional<User> existing = userRepository.findByEmail(request.getEmail());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("User with this email already exists.");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(request.getRole());

        userRepository.save(user);
        userDetailsService.evictUserFromCache(request.getEmail()); // Evict cache to prevent stale data
        logger.info("User signed up successfully: " + request.getEmail());
    }

    public LoginResponse login(LoginRequest loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Email and password must be provided.");
        }

        logger.info("Attempting login for user: " + loginRequest.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        String token = jwtUtil.generateToken(email);

        // Fetch user details from repository
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found after authentication"));

        logger.info("Login successful for user: " + email);

        return new LoginResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole()
        );
    }

    public boolean validateToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.warning("Invalid Authorization header");
            return false;
        }
        String token = authHeader.substring(7);
        try {
            String email = jwtUtil.getEmailFromToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            boolean isValid = jwtUtil.validateToken(token, userDetails);
            logger.info("Token validation for user " + email + ": " + isValid);
            return isValid;
        } catch (Exception e) {
            logger.warning("Token validation failed: " + e.getMessage());
            return false;
        }
    }

    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        logger.info("Fetching current user with email: " + email);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public UserSettingsDTO getUserSettings() {
        User user = getCurrentUser();
        return new UserSettingsDTO(user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole());
    }

    public void changePassword(PasswordChange passwordChangeDTO) {
        User user = getCurrentUser();

        // Verify current password
        if (!passwordEncoder.matches(passwordChangeDTO.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        // Verify new password matches confirm password
        if (!passwordChangeDTO.getNewPassword().equals(passwordChangeDTO.getConfirmPassword())) {
            throw new IllegalArgumentException("New password and confirm password do not match");
        }

        // Update password
        user.setPassword(passwordEncoder.encode(passwordChangeDTO.getNewPassword()));
        userRepository.save(user);
        userDetailsService.evictUserFromCache(user.getEmail()); // Evict cache to prevent stale data
        logger.info("Password changed successfully for user: " + user.getEmail());
    }
}