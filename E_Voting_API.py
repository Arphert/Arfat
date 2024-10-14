from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
import logging
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:69012028@localhost:6568/E_Voting'
app.config['SECRET_KEY']='arfat'

db = SQLAlchemy(app)

class Credentials(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(50))
    reg_no=db.Column(db.String(9),unique=True)
    email=db.Column(db.String(50),unique=True)
    phone=db.Column(db.String(11))
    password=db.Column(db.String(8))
    
    def to_dictionary(self):
        return{'id':self.id,'name':self.name,'phone':self.phone,'email':self.email,'password':self.password,'reg_no':self.reg_no}
    

class Tasks(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('credentials.id'),nullable=False)
    task=db.Column(db.String(255))
    status=db.Column(db.String(50))
    created_at = db.Column(db.DateTime,default=db.func.current_timestamp())
    
    def to_dictionary(self):
        return {'id': self.id, 'task': self.task, 'status': self.status, 'created_at': self.created_at}
    

@app.route('/Credentials',methods=["POST"])
def SignUp():
    try:
        new_user=Credentials(name=request.json['name'],email=request.json['email'],phone=request.json['phone'],password=request.json['password'],reg_no=request.json['reg_no'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dictionary())
    except Exception as E:
        return{'error':E}
    
@app.route('/Credentials/<reg_no>',methods=["GET"])
def Login(reg_no):
    try:
    
        User = Credentials.query.filter_by(reg_no=reg_no).first()
        if User:
            return jsonify(User.to_dictionary())
        else:
            return{'error':'user not found'}
    except Exception as E:
        return{'error':str(E)}
    
@app.route('/Tasks',methods=["POST"])
def addTask():
    try:
        new_task=Tasks(user_id=request.json['user_id'],task=request.json['task'])
        db.session.add(new_task)
        db.session.commit()
        return jsonify(new_task.to_dictionary())
    except Exception as E:
        return {'error':str(E)}
    
@app.route('/Tasks/<user_id>',methods=["GET"])
def getTasks(user_id):
    try:
        tasks=Tasks.query.filter_by(user_id=user_id).all()
        return jsonify([task.to_dictionary() for task in tasks])
    except Exception as E:
        return{'error':E}

@app.route('/Tasks/<task_id>',methods=["PUT"])
def updateTasks(task_id):
    try:
        task=Tasks.query.get(task_id)
        if task:
            task.status=request.json['status']
            db.session.commit()
            return jsonify(task.to_dictionary())
    except Exception as E:
        return{'error':str(E)}
    
@app.route('/Tasks/<task_id>',methods=["DELETE"])
def deleteTask(task_id):
    try:
        task=Tasks.query.get(task_id)
        if task:
            db.session.delete(task)
            db.session.commit()
            return{'message':'task deleted succesfully'}
        else:
            return{"error":"task not found"}
    except Exception as E:
        return{'error':str(E)}
        
    

logging.basicConfig(level=logging.DEBUG)

if __name__ == '__main__':
    
    app.run(debug=True)
    
    