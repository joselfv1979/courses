package com.jose.coursescrud.utils.request;

import javax.validation.constraints.NotBlank;

// CLASE QUE CONTIENE LOS DATOS DE PETICION DE LOGIN DE UN USUARIO
public class LoginRequest {
    @NotBlank
	private String username;

	@NotBlank
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
