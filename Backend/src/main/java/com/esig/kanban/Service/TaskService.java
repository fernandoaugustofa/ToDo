package com.esig.kanban.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.esig.kanban.Model.Task;
// import com.esig.kanban.Model.User;

import com.esig.kanban.Repository.TaskRepository;
// import com.esig.kanban.Repository.UserRepository;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;

	// @Autowired
	// private UserRepository userRepository;

	public List<Task> findAll() {
		return taskRepository.findAll(Sort.by(Sort.Direction.ASC, "priority"));
	}

	public List<Task> Search(String title) {
		return taskRepository.findAllByTitleLike(title);
	}

	public Task save(Task task) {
		System.out.println(task);
		// User user = userRepository.getById(task.getUser().getId());
		// task.setUser(user);
		return taskRepository.save(task);
	}
	
	public Optional<Task> findById(Long id) {
		return taskRepository.findById(id);
	}

	public void delete(Long id) {
		taskRepository.deleteById(id);
	}
}
