package com.Anoshor.myApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Anoshor.myApp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Additional query methods can be defined here
}