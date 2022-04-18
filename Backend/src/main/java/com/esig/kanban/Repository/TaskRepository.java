package com.esig.kanban.Repository;

import java.util.List;

import com.esig.kanban.Model.Task;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByTitleLike(String title);
}
