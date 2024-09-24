from flask_restx import Namespace, Resource, fields
from flask import Flask, request
from flask_jwt_extended import jwt_required
from models import Mod
from flask import Flask, request, jsonify
import pandas as pd


mod_ns = Namespace('mod', description = 'A namesapce for Mods')


# ====================================== model (serializer) ======================================
mod_model = mod_ns.model(
   "Mod",
   {
       "id":fields.Integer(),
       "name":fields.String(),
       "brand":fields.String(),
       "model":fields.String(),
       "yom":fields.Integer(),
       "part":fields.String()
   }
)


# ====================================== hello ======================================
@mod_ns.route('/hello')
class HelloResource(Resource):
   def get(self):
       return {"message": "Hello World"}


# ====================================== mods ======================================
@mod_ns.route('/mods')
class ModsResource(Resource):


   @mod_ns.marshal_list_with(mod_model)
   def get(self):
       """Get all mods"""
       mods = Mod.query.all()
       return mods


   @mod_ns.marshal_with(mod_model)
   @mod_ns.expect(mod_model)
   @jwt_required()
   def post(self):
       """Create a new mod"""
       data = request.get_json()
       new_mod = Mod(
           name = data.get('name'),
           brand = data.get('brand'),
           model = data.get('model'),
           yom = data.get('yom'),
           part = data.get('part')
       )
       new_mod.save()
       return new_mod, 201


# ====================================== mod/<> ======================================
@mod_ns.route('/mod/<int:id>')
class ModResource(Resource):


   @mod_ns.marshal_with(mod_model)
   def get(self, id):
       """Get a mod by id"""
       mod = Mod.query.get_or_404(id)
       return mod


   @mod_ns.marshal_with(mod_model)
   @jwt_required()
   def put(self, id):
       """Update a mod by id"""
       mod_to_update = Mod.query.get_or_404(id)
       data = request.get_json()
       mod_to_update.update(data.get('name'), data.get('brand'), data.get('model'), data.get('yom'), data.get('part'))
       return mod_to_update


   @mod_ns.marshal_with(mod_model)
   @jwt_required()
   def delete(self, id):
       """Delete a mod by id"""
       mod_to_delete = Mod.query.get_or_404(id)
       mod_to_delete.delete()
       return mod_to_delete


# ====================================== search ======================================
@mod_ns.route('/search')
class SearchModResource(Resource):
    
    def get(self):
        # Get the brand, model, and part from request arguments
        brand = request.args.get('brand').strip().lower()
        model = request.args.get('model').strip().lower()
        part = request.args.get('part').strip().lower()
        
        # Load the CSV file
        df = pd.read_csv('modmobili.csv')
        
        # Normalize the CSV data by stripping whitespace and converting to lowercase
        df['brand'] = df['brand'].str.strip().str.lower()
        df['model'] = df['model'].str.strip().str.lower()
        df['part'] = df['part'].str.strip().str.lower()
        
        # Search for a matching row
        match = df[(df['brand'] == brand) & (df['model'] == model) & (df['part'] == part)]
        
        if not match.empty:
            # If a match is found, return the name and price
            result = match.iloc[0].to_dict()
            return jsonify({
                'name': result['name'],  # Assuming the column is called 'mod_name'
                'price': result['price']
            })
        else:
            # If no match is found, return a "no match" message
            return jsonify({'message': 'sorry no match'})
