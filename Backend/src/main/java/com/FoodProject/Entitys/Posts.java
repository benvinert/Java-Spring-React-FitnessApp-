package com.FoodProject.Entitys;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Posts")
public class Posts {
	
    @Id
    @GeneratedValue
	private int id;
    @Lob
	private String Content;
	private String title;
	private String username;
	private float weightbefore;
	private float bodyfatbefore;
	private float weightafter;
	private float bodyfatafter;
	@Lob
	private byte[] BeforeImage;
	@Lob
	private byte[] AfterImage;
}
