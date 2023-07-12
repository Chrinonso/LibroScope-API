const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser} = require('../utils');

const register = async (req,res) => {
    const { email,name,password } = req.body;
    
    const emailAlreadyExists = (await User.findOne({ email }));

    if(emailAlreadyExists) {
        throw new CustomError.BadRequestError('email aready exists, please try another email address')
    }

    const user = await User.create({email,name,password});
    const tokenUser = createTokenUser(user);
    
    attachCookiesToResponse({res, user:tokenUser});
    res.status(StatusCodes.CREATED).json({user: tokenUser});
};

const login = async (req,res) => {
    const { email, password} = req.body;
    if(!email || !password) {
        throw new CustomError.BadRequestError('please provide email and password');

    }

    const user = await User.findOne({ email })
    if(!user) {
        throw new CustomError.NotFoundError('there is no user with the email details!! please provide correct email')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        throw new CustomError.UnauthorizedError('password incorrect!! please provide correct password!!')
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res, user:tokenUser});
    
    res.status(StatusCodes.OK).json({ user:tokenUser })

};

const logout = async (req,res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires:new date(Date.now()),
    });
    res.status(StatusCodes.OK).json({msg: 'user logged out'});
};

module.exports = {
    register,
    login,
    logout,
};
