from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import logging

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

# Mock Data
tasks = [
    {
        "id": "task-1",
        "title": "Research project requirements",
        "description": "Gather all necessary information for the upcoming project",
        "status": "todo"
    },
    {
        "id": "task-2",
        "title": "Design user interface",
        "description": "Create wireframes and mockups for the application",
        "status": "todo"
    },
    {
        "id": "task-3",
        "title": "Implement login functionality",
        "description": "Add authentication system to the application",
        "status": "inProgress"
    },
    {
        "id": "task-4",
        "title": "Write documentation",
        "description": "Document the API endpoints and usage instructions",
        "status": "inProgress"
    },
    {
        "id": "task-5",
        "title": "Fix navigation bug",
        "description": "Address the issue with menu navigation on mobile devices",
        "status": "done"
    },
    {
        "id": "task-6",
        "title": "Deploy to staging environment",
        "description": "Prepare and deploy the app to the staging server",
        "status": "done"
    }
]

@app.route('/', methods=['GET'])
def home():
    app.logger.info("Home endpoint called")
    return jsonify({"message": "API is working!"})

@app.route('/api/tasks', methods=['GET'])
def fetch_tasks():
    app.logger.info("Fetching all tasks")
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def add_task():
    new_task = request.json
    new_task['id'] = f"task-{int(time.time() * 1000)}"
    tasks.append(new_task)
    app.logger.info(f"Created new task: {new_task['id']}")
    return jsonify(new_task)

@app.route('/api/tasks/<task_id>', methods=['PUT'])
def update_task(task_id):
    updated_task = request.json
    
    for i, task in enumerate(tasks):
        if task['id'] == task_id:
            tasks[i] = {**task, **updated_task}
            app.logger.info(f"Updated task: {task_id}")
            return jsonify(tasks[i])
    
    app.logger.warning(f"Task not found: {task_id}")
    return jsonify({"error": "Task not found"}), 404

@app.route('/api/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    initial_count = len(tasks)
    tasks = [task for task in tasks if task['id'] != task_id]
    
    if len(tasks) < initial_count:
        app.logger.info(f"Deleted task: {task_id}")
        return jsonify({"success": True})
    else:
        app.logger.warning(f"Task not found for deletion: {task_id}")
        return jsonify({"error": "Task not found"}), 404

@app.route('/api/tasks/<task_id>/status', methods=['PATCH'])
def update_task_status(task_id):
    new_status = request.json.get('status')
    
    if not new_status:
        app.logger.warning("Status is required for PATCH request")
        return jsonify({"error": "Status is required"}), 400
    
    for i, task in enumerate(tasks):
        if task['id'] == task_id:
            tasks[i]['status'] = new_status
            app.logger.info(f"Updated status of task {task_id} to {new_status}")
            return jsonify(tasks[i])
    
    app.logger.warning(f"Task not found for status update: {task_id}")
    return jsonify({"error": "Task not found"}), 404

@app.before_request
def log_request_info():
    app.logger.debug('Headers: %s', request.headers)
    app.logger.debug('Body: %s', request.get_data())

if __name__ == '__main__':
    app.logger.info("Starting Flask API server...")
    app.run(debug=True, host='0.0.0.0', port=8000)