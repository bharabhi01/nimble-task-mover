FROM python:3.9-slim
WORKDIR /app
COPY backend/ .
RUN apt-get update && apt-get install -y python3-pip
RUN pip3 install flask flask_cors gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "api:app"]