package com.jose.coursescrud.utils.response;

// CLASE PARA LA CREACIÓN DE MENSAJES DE RESPUESTA
public class MessageResponse {
    private String message;

	public MessageResponse(String message) {
	    this.message = message;
	  }

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
