package com.FoodProject.Payload;


public class ResponseData {
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long size;
    private String PictureID;
    public ResponseData(String fileName, String fileType, long size,String PictureID) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.size = size;
        this.PictureID = PictureID;
    }


	public String getFileName() {
        return fileName;
    }

    public String getPictureID() {
		return PictureID;
	}


	public void setPictureID(String pictureID) {
		PictureID = pictureID;
	}


	public void setFileName(String fileName) {
        this.fileName = fileName;
    }


    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }
}