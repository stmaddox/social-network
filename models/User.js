const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            match: [/.+@.+\..+/],
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// get number of friends 
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;