package com.emp_man.ems.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.logging.Logger;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = Logger.getLogger(JwtAuthenticationFilter.class.getName());

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String requestPath = request.getServletPath();

        // Skip token validation for paths that are explicitly permitted in security
        // config
        if (requestPath.startsWith("/api/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String email = null;

        // Log request info
        logger.info("Processing request: " + requestPath + " with auth header present: " + (authHeader != null));

        // Extract JWT token from Authorization header
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                email = jwtUtil.getEmailFromToken(token); // Extract email from token
                logger.info("Processing request with token for user: " + email);
            } catch (Exception e) {
                logger.warning("Invalid token: " + e.getMessage());
                sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
                return;
            }
        } else {
            logger.warning("No Authorization header or invalid format for path: " + requestPath);
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                    "Authorization header missing or invalid format. Use 'Bearer <token>'");
            return;
        }

        // Authenticate if email is present and no authentication exists in context
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email); // Load user by email
                if (jwtUtil.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    logger.info("Authentication successful for user: " + email);
                } else {
                    logger.warning("Token validation failed for user: " + email);
                    sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Token validation failed");
                    return;
                }
            } catch (Exception e) {
                logger.severe("Authentication error: " + e.getMessage());
                sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                        "Authentication error: " + e.getMessage());
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\":\"" + message + "\"}");
    }
}