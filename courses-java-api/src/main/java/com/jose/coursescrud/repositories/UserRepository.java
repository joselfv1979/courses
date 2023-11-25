package com.jose.coursescrud.repositories;

import java.util.Optional;

import com.jose.coursescrud.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// CLASE QUE GESTIONA EL ACCESO A DATOS SOBRE LA TABLA DE USUARIOS
@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	Optional<User> findById(Long id);
}
