package com.hcld2.jwtdemo.service;

import com.hcld2.jwtdemo.dto.PostRequest;
import com.hcld2.jwtdemo.dto.PostResponse;
import com.hcld2.jwtdemo.entity.Post;
import com.hcld2.jwtdemo.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepository posts;

    @Transactional(readOnly = true)
    public List<PostResponse> findAll() {
        return posts.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PostResponse::from)
                .toList();
    }


    @Transactional
    public PostResponse addPost(PostRequest req, String username) {
        Post saved = posts.save(new Post(req.title(), req.content(), username));
        return PostResponse.from(saved);
    }

    @Transactional
    public void deletePost(Long id, String username) {
        Post post = posts.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!post.getAuthor().equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        posts.delete(post);
    }
}
