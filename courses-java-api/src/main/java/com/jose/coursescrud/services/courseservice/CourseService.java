package com.jose.coursescrud.services.courseservice;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

import com.jose.coursescrud.models.Course;
import com.jose.coursescrud.models.User;

public interface CourseService {

    public List<Course> getFilteredCourses(HashMap<String, Object> conditions);

    public Set<User> getUsersByCourse(int id);

    public Course addUsersToCourse(int id, String username);

    public Course getCourse(int id);

    public Boolean existsByDescription(String description);

    public Course updateCourse(Course course);

    public Course createCourse(Course course);

    public void deleteCourse(int id);
    
}
