from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder
import numpy as np

from sqlalchemy import Column, BigInteger, String, Integer

app = Flask(__name__)
api = Api(app)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/shopmall'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Mall(db.Model):
    __tablename__ = 'mall'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    categories = Column(String(255))
    location = Column(String(255))
    mall_admin = Column(String(255))
    mall_admin_email = Column(String(255))
    name = Column(String(255))
    # cluster_label = Column(Integer)  # Add a column to store clustering labels

# Define the clustering resource
class ClusterResource(Resource):
    def get(self):
        # Fetch mall data from the database
        malls = Mall.query.all()

        # Preprocess data
        locations = [mall.categories for mall in malls]

        if not locations:
            return jsonify({"error": "No data available for clustering"})

        # Convert locations to numerical labels
        label_encoder = LabelEncoder()
        locations_encoded = label_encoder.fit_transform(locations)

        # Reshape to meet the input requirements of KMeans
        locations_encoded = locations_encoded.reshape(-1, 1)

        # Apply KMeans clustering based on the 'location' feature
        kmeans = KMeans(n_clusters=3)  # Adjust the number of clusters as needed
        labels = kmeans.fit_predict(locations_encoded)

        # Add clustering labels to the Mall model
        for i, label in enumerate(labels):
            malls[i].cluster_label = label

        # Commit changes to the database
        db.session.commit()

        # Convert malls to a serializable format before jsonify
        malls_data = [
            {
                "id": int(mall.id),
                "categories": mall.categories,
                "location": mall.location,
                "mall_admin": mall.mall_admin,
                "mall_admin_email": mall.mall_admin_email,
                "name": mall.name,
                "cluster_label": int(mall.cluster_label)
            }
            for mall in malls
        ]

        # Format the result
        return jsonify(malls_data)

# Add the clustering resource to the API
api.add_resource(ClusterResource, '/clusters')

if __name__ == '__main__':
    app.run(debug=True)
