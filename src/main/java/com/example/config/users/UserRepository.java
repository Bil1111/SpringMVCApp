package com.example.config.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByLogin(String login);
    User findByPhoneNumber(String phoneNumber);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.lastIp = :ip WHERE u.id = :userId")
    void updateLastIp(@Param("userId") Long userId, @Param("ip") String ip);

    @Query(value = "SELECT last_ip FROM users", nativeQuery = true)
    List<String> findAllByIp();
}