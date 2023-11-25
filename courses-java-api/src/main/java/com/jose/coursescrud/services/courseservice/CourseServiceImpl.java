package com.jose.coursescrud.services.courseservice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.jose.coursescrud.models.Course;
import com.jose.coursescrud.models.User;
import com.jose.coursescrud.repositories.CourseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// CONTIENE LAS OPERACIONES A REALIZAR SOBRE LOS CURSOS
@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    CourseRepository courseRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Set<User> getUsersByCourse(int id) {
        Course course = courseRepository.findById(id);
		Set<User> userList = course.getUsers();
        return userList;
    }

    @Override
    public Course addUsersToCourse(int id, String username) {
        Course course = courseRepository.findById(id);
		Course courseUpdated = courseRepository.save(course);
		return courseUpdated;
    }

    @Override
    public Course getCourse(int id) {
        return courseRepository.findById(id); 
    }

    @Override
    public Boolean existsByDescription(String description){
        return courseRepository.existsByDescription(description);
    };

    @Override
    public Course updateCourse(Course course) {
        Course courseUpdated = courseRepository.save(course);
        return courseUpdated;
    }

    @Override
    public Course createCourse(Course course) {
        Course createdCourse = courseRepository.save(course);
        return createdCourse;
    }

    @Override
    public void deleteCourse(int id) {

        Course course = courseRepository.findById(id);

		course.getUsers().removeAll(course.getUsers());

		courseRepository.delete(course);
    }

    @Override
    public List<Course> getFilteredCourses(HashMap<String, Object> conditions) {
    
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Course> query = cb.createQuery(Course.class);
        Root<Course> root = query.from(Course.class);

        List<Predicate> predicates = new ArrayList<>();
        conditions.forEach((field, value) -> {
            switch (field) {
                case "language":
                    predicates.add(cb.equal(root.get(field), (String) value));
                    break;
                case "format":
                    predicates.add(cb.like(root.get(field), "%" + (String) value + "%"));
                    break;
                case "price":
                    predicates.add(cb.lessThanOrEqualTo(root.get(field), (String) value));
                    break;
            }
        });

        query.select(root).where(predicates.toArray(new Predicate[predicates.size()]));
        
        return entityManager.createQuery(query).getResultList();
    }
    
}
