package com.jose.coursescrud.services.userservice;

import java.util.List;
import java.util.Set;

import com.jose.coursescrud.models.Course;
import com.jose.coursescrud.models.User;
import com.jose.coursescrud.utils.request.SignupRequest;

public interface UserService {
    
    public List<User> getAllUsers();

    public Boolean createUser(SignupRequest signUpRequest);

    public User getUser(Long id);

    public void addCourseToUser(Long id, Course course);

    public void deleteUser(Long id);

    public void DeleteCourseToUser(Long id, Course course);

    public Set<Course> getCoursesByUser(Long id);
}
