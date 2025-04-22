package com.inmobiliaria.backend.auth.filter;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inmobiliaria.backend.entities.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static com.inmobiliaria.backend.auth.TokenJwtConfig.*;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager2) {
        this.authenticationManager = authenticationManager2;
    }

    // para crear un token para poder autenticar el usuario
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        String username = null;
        String password = null;

        try {
            Users user = new ObjectMapper().readValue(request.getInputStream(), Users.class);
            username = user.getUsuario();
            password = user.getPassword();

        } catch (StreamReadException e) {
            e.printStackTrace();
        } catch (DatabindException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
                password);
        return this.authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
                //usamos esta clase y la casteamos a org.springframework.security.core.userdetails.User
                org.springframework.security.core.userdetails.User userDetails = (org.springframework.security.core.userdetails.User) authResult.getPrincipal();
                String username = userDetails.getUsername();
                Collection<? extends GrantedAuthority> roles = authResult.getAuthorities();
                //creamos los claims para  identificar el usuario y sus roles y añadirselo a un token
                Claims claims = Jwts.claims().add("authorities", new ObjectMapper().writeValueAsString(roles)).add("username",username).build();

                //importamos SECRET_KEY y creamos un  token
                String jwt = Jwts.builder().subject(username).claims(claims).signWith(SECRET_KEY).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis()+3600000)).compact();
                //enviamos el token al cliente
                response.addHeader(HEADER_AUTHORITATION,PREFIX_TOKEN + jwt);
                Map<String,String> responseBody = new HashMap<>();
                responseBody.put("token",jwt);
                responseBody.put("username",username);
                responseBody.put("message",String.format( "Has iniciado sesión con exito"));
//convertimos el map en un JSON
                response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));
                //deberia poner esto en una constante
                response.setContentType(CONTENT_TYPE);    
                //enviamos que todo esta correcto
                response.setStatus(CORRECT_RESPONSE);
            }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
                Map<String, String> responseBody = new HashMap<>();
                responseBody.put("Message","ERROR - Invalid username or password");
                responseBody.put("Error",failed.getMessage());
                response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));
                response.setContentType(CONTENT_TYPE);
                response.setStatus(401);
            }
}
