const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
//@desc get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async(req,res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
})

//@desc Get contact
//@route GET /api/contact/:id
//@access public

const getContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

//@desc Create new contact
//@route POST /api/contact
//@access public

const createContact = asyncHandler(async(req,res) => {
    console.log("The req body is :" , req.body)
    const {name , email, phone} = req.body //destructure so in es6 if key and value are same then we can write key as both
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const contact = await Contact.create({
        name,  //key:value name is same thats why we have wrote key value only
        email,
        phone
    })
    res.status(201).json(contact)
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true}
    )
    res.status(200).json(updatedContact)
})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    await Contact.romove();
    res.status(200).json(contact)
})

module.exports = { getContacts , getContact , createContact , updateContact , deleteContact }