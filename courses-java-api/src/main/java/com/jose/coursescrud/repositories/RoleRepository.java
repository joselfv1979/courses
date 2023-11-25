package com.jose.coursescrud.repositories;

import java.util.Optional;

import com.jose.coursescrud.models.ERole;
import com.jose.coursescrud.models.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// CLASE QUE GESTIONA EL ACCESO A DATOS SOBRE LA TABLA DE ROLES
@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{
    Optional<Role> findByName(ERole name);
}
