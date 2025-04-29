package com.emp_man.ems.security;

import com.emp_man.ems.Models.User;
import com.emp_man.ems.Repositories.UserRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.logging.Logger;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = Logger.getLogger(CustomUserDetailsService.class.getName());
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Cacheable(value = "users", key = "#email") // Caching with specific email key
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.info("Loading user from database: " + email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        GrantedAuthority authority = new SimpleGrantedAuthority(
                "ROLE_" + user.getRole().toUpperCase().replace(" ", "_"));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(authority));
    }

    @CacheEvict(value = "users", key = "#email")
    public void evictUserFromCache(String email) {
        logger.info("Evicting user from cache: " + email);
    }

    @CacheEvict(value = "users", allEntries = true)
    public void evictAllUsersFromCache() {
        logger.info("Evicting all users from cache");
    }
}
