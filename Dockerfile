FROM python:3.9.6
WORKDIR /usr/local/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

RUN groupadd -g 1000 app && \
    useradd -u 1000 -g app -m app && \
    chown -R app:app /usr/local/app
COPY --chown=app:app . .
USER app

EXPOSE 8080

ENV FLASK_APP=project-smile.py

CMD ["flask", "run", "--host=0.0.0.0", "--port=8080"]
