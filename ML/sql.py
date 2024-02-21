from flask import Flask, request, jsonify
import mysql.connector
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
# Configure Genai Key
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
    print("Query: ", sql)
    cursor.execute(sql)
    rows = cursor.fetchall()
    conn.commit()
    conn.close()
    return rows

# Define Your Prompt
prompt = [
    """
    You are an expert in converting English questions to SQL query!
    The SQL table has the name MALL and has the following columns - 
    categories, location, mall_admin, mall_admin_email, name

    also the sql code should not have ``` in the beginning or end and sql word in output
    """
]

@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        question = data['promt']

        response = get_gemini_response(question, prompt)
        response_from_db = read_sql_query(response, db_config)

       

        return jsonify(response_from_db), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
