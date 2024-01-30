# Shopping Mall Management System

This is a Spring Boot project for managing a shopping mall system. It handles various aspects of mall management including inventory, sales, and customer management.

## Prerequisites

Before running this project, ensure you have the following installed:

- Java Development Kit (JDK) version 8 or later
- Maven
- MySQL Server

## Setup

1. **Clone the Repository:**

git clone https://github.com/RohitBhandare/shopping-mall-management-system.git



2. **Database Configuration:**

- Create a MySQL database named `shopping_mall`.
- Update the database configuration in `application.properties` located in `src/main/resources`:

  ```
  spring.datasource.url=jdbc:mysql://localhost:3306/shopping_mall
  spring.datasource.username=<your_mysql_username>
  spring.datasource.password=<your_mysql_password>
  ```

3. **Running the Application:**

Navigate to the project directory and run the following command:

mvn spring-boot:run

## Usage

Once the application is running, you can access the endpoints using any HTTP client or web browser. By default, the application runs on `http://localhost:8080`.


## Shots

![Screenshot (422)](https://github.com/RohitBhandare/shopping-mall-management-system/assets/92716110/5e7ab2db-1b9d-441e-8ddb-15e878735bba)
![Screenshot (419)](https://github.com/RohitBhandare/shopping-mall-management-system/assets/92716110/9887995d-71e0-4d1c-9d7d-81c3a56dbf17)
![Screenshot (417)](https://github.com/RohitBhandare/shopping-mall-management-system/assets/92716110/b2d6d40a-43c3-47ab-89ce-dde41ad08aac)
![Screenshot (416)](https://github.com/RohitBhandare/shopping-mall-management-system/assets/92716110/1a9ae760-840d-4380-9ad0-b9d48a99a2a0)
![Screenshot (414)](https://github.com/RohitBhandare/shopping-mall-management-system/assets/92716110/731de7e9-a077-411b-a56d-28e998a71624)
![Screenshot (425)](https://github.com/RohitBhandare/shopping-mall-management-system/assets/92716110/4afb3c2e-b794-4812-a84b-a4b8cc9c5467)
![Screenshot (423)](https://github.com/RohitBhandare/shopping-mall-management-system/assets/92716110/2a542f5c-004c-427b-9bc9-439d33aff5a7)


