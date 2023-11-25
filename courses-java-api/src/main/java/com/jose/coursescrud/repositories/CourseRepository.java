package com.jose.coursescrud.repositories;

import com.jose.coursescrud.models.Course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// CLASE QUE GESTIONA EL ACCESO A DATOS SOBRE LA TABLA DE CURSOS
@Repository
public interface CourseRepository extends JpaRepository<Course, Long>{

    public Course findById(int id);

    public Boolean existsByDescription(String description);
	
    public void deleteById(int id);

}
