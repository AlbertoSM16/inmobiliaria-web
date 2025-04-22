package com.inmobiliaria.backend.auth.filter;

import static com.inmobiliaria.backend.auth.TokenJwtConfig.*;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtValidationFilter extends BasicAuthenticationFilter {

    public JwtValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
                
                String header = request.getHeader(HEADER_AUTHORITATION);
                if(header == null || !header.startsWith(PREFIX_TOKEN)){
                    chain.doFilter(request,response);
                    return;
                }
                //para obtener el  token
                String token = header.replace(PREFIX_TOKEN,"");
                try{
                    Claims claims = Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token).getPayload();
                    //obtenemos el usuario, o con string username = claims.get("username") y lo casteo a string
                    String username = claims.getSubject();
                    Object authoritiesObject = claims.get("authorities");
                    Collection<? extends GrantedAuthority> roles = Arrays.asList(new ObjectMapper().readValue(authoritiesObject.toString().getBytes(),SimpleGrantedAuthority[].class)); 
                    
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,roles);
                    
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    chain.doFilter(request,response);
                }catch(JwtException e ){
                    Map<String,String> responseBody = new HashMap<>();
                    responseBody.put("Message", "Token is invalid");
                    response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));
                    response.setContentType(CONTENT_TYPE);
                    response.setStatus(401);
                    
                }

    }

   
}
