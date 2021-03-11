package com.FoodProject.Service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.FoodProject.Entitys.Posts;
import com.FoodProject.Repository.PostsRepository;
import com.FoodProject.Repository.UsersRepository;

@Service
public class PostsService {
		
	@Autowired 
	private PostsRepository postrepo;
	
	@Autowired
	private UsersRepository userrepo;
	
	public Posts AddPost(String usernameFromWeb,MultipartFile before,MultipartFile after,Posts body) throws IOException {
		String username = userrepo.findByUsername(usernameFromWeb).getUsername();
		System.out.println("dasdasdasda");
		byte[] beforeimage = before.getBytes();
		byte[] afterimage = after.getBytes();
		Posts post = body;
		post.setBeforeImage(beforeimage);
		post.setAfterImage(afterimage);
		post.setUsername(username);
		return postrepo.save(post);
	}
	
	public List<Posts> GetAllResults(){
		List<Posts> posts = postrepo.findAll();
		for(Posts post : posts) {
			byte[] before = null;
			byte[] after = null;
			before = Base64.getEncoder().encode(post.getBeforeImage());
			after = Base64.getEncoder().encode(post.getAfterImage());
	    	post.setBeforeImage(before);
	    	post.setAfterImage(after);
	    	
		}
		return posts;
	}
}
