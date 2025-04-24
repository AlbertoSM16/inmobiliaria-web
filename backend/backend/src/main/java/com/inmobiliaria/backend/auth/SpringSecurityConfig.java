package com.inmobiliaria.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.inmobiliaria.backend.auth.filter.JwtAuthenticationFilter;
@Configuration

public class SpringSecurityConfig {
    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, "/api/inmuebles", "/api/users/page/{page}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/inmuebles/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/inmuebles/all").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/contracts").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/contracts/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/type-contract").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/type-contract/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/type-contract").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/types").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/types/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/type-buildings/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/type-buildings").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/inmuebles").hasRole("admin")
                        .requestMatchers(HttpMethod.POST, "/login").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/inmuebles/{id}").hasRole("admin")
                        .requestMatchers(HttpMethod.DELETE, "/api/inmuebles/{id}").hasRole("admin")
                        .anyRequest().authenticated())
                .addFilter(new JwtAuthenticationFilter(this.authenticationManager()))
                .csrf(config -> config.disable())
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }
}
