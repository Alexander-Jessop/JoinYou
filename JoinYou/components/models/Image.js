class Image {
  constructor(title, imageUri, description) {
    this.title = title;
    this.imageUri = imageUri;
    this.description = description;
    this.id = new Date().toString() + Math.random().toString();
  }
}

// Replace .id = (database UID when available from server)
// this is simply to test
