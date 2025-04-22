package com.inmobiliaria.backend.auth;


import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;

public class TokenJwtConfig {   

    public static final String CONTENT_TYPE = "application/json";
    public static final int CORRECT_RESPONSE = 200;
    public static final String HEADER_AUTHORITATION = "Authorization";
    public static final String PREFIX_TOKEN = "bearer ";

    public static final SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();

}
