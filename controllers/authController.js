const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors')

const register = async (req,res) => {
    const { email } = req.body;
    
    const emailAlreadyExists = (await User.findOne({ email }));

    if(emailAlreadyExists) {
        throw new CustomError.BadRequestError('email aready exists, please try another email address')
    }

    const user = await User.create(req.body);

    res.status(StatusCodes.CREATED).json({ user })
};

const login = async (req,res) => {
    res.send('login user')
};

const logout = async (req,res) => {
    res.send('logout user')
};


module.exports = {
    register,
    login,
    logout,
};