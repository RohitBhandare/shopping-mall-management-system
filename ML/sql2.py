import google.generativeai as genai
## Configure Genai Key
import mysql.connector

genai.configure(api_key='AIzaSyBdJFij6oNUA8fYpPq2QDTetktjVHxCUjM')

# Configure database connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'shopmall'
}

# Function To Load Google Gemini Model and provide queries as response
def get_gemini_response(question, prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content([prompt[0], question])
    return response.text

# Function To retrieve query from the database
def read_sql_query(sql, db_config):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)  # Using dictionary cursor for easier handling of results
    cursor.execute(sql)
    rows = cursor.fetchall()
    conn.commit()
    conn.close()
    for row in rows:
        print(row)
    return rows

# Define Your Prompt
prompt = [
    """
    You are an expert in converting English questions to SQL query!
    The SQL table has the name MALL and has the following columns - 
    categories, location, mall_admin, mall_admin_email, name
   
   also the sql code should not have ``` in beginning or end and sql word in output
    """
]

while(True):
    print("Gemini App To Retrieve SQL Data")


    question = input("Input: ")


    response = get_gemini_response(question, prompt)
    print(response)

    response_from_db = read_sql_query(response, db_config)
    
    print("The Response is:")
    for row in response_from_db:
        print(row)

