package com.emp_man.ems.Controllers;

import com.emp_man.ems.DTOs.LoginRequest;
import com.emp_man.ems.DTOs.LoginResponse;
import com.emp_man.ems.DTOs.SignupRequest;
import com.emp_man.ems.DTOs.PasswordChange;
import com.emp_man.ems.DTOs.UserSettingsDTO;
import com.emp_man.ems.Models.User;
import com.emp_man.ems.Service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        authService.signup(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    public ResponseEntity<Void> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authService.validateToken(authHeader)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/settings")
    public ResponseEntity<UserSettingsDTO> getUserDetails() {
        UserSettingsDTO userSettings = authService.getUserSettings();
        return ResponseEntity.ok(userSettings);
    }

//    @PutMapping("/settings")
//    public ResponseEntity<User> updateUserDetails(@Valid @RequestBody UserUpdateDTO updateDTO) {
//        User updatedUser = authService.updateUser(updateDTO);
//        return ResponseEntity.ok(updatedUser);
//    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody PasswordChange passwordChangeDTO) {
        authService.changePassword(passwordChangeDTO);
        return ResponseEntity.ok("Password changed successfully");
    }
}