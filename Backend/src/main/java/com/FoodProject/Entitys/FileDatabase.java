package com.FoodProject.Entitys;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Data
@Table(name = "files")
public class FileDatabase {

	    @Id
	    @GeneratedValue(generator = "uuid")
	    @GenericGenerator(name = "uuid", strategy = "uuid2")
	    private String id;
	    private String fileName;
	    private String fileType;
	    @Column(unique=true)
	    private int consumerid;
	    @Lob
	    private byte[] data;
	    
	    public FileDatabase(String fileName, String fileType, byte[] data,int consumerid) {
	        this.fileName = fileName;
	        this.fileType = fileType;
	        this.data = data;
	        this.consumerid = consumerid;
	    }
}
