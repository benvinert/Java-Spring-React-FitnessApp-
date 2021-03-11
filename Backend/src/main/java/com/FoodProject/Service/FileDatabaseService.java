package com.FoodProject.Service;

import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.FoodProject.Entitys.FileDatabase;
import com.FoodProject.Repository.DatabaseFileRepository;
@Service
public class FileDatabaseService {

	
	@Autowired
	DatabaseFileRepository databasefilerepo;
	
	public FileDatabase storeFile(MultipartFile file,int consumerid) throws Exception {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new Exception("Sorry! Filename contains invalid path sequence " + fileName);
            }
            FileDatabase dbFile = new FileDatabase(fileName, file.getContentType(), file.getBytes(),consumerid);
            return databasefilerepo.save(dbFile);
		}catch (IOException ex) {
            throw new Exception("Could not store file " + fileName + ". Please try again!", ex);
        }
		
		
	}
	
    public FileDatabase getFile(int consumerid) throws FileNotFoundException {
        return databasefilerepo.findByConsumerid(consumerid);
    }
}
