import mongoose from 'mongoose'
import { IUser } from '../../types/userTypes'
import { EUserRole } from '../../constants/applicationEnums'

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            minlength: 2,
            maxlength: 72,
            required: true
        },
        emailAddress: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            default: EUserRole.USER,
            enum: Object.values(EUserRole),
            required: true
        },
        organisation: {
            _id: false,
            isAssociated: {
                type: Boolean,
                default: false,
                required: true
            },
            organisationId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'organisation',
                required: false
            },
            role:{
                type: String,
                required: false
            }
        },
        accountConfirmation: {
            _id: false,
            status: {
                type: Boolean,
                default: false,
                required: true
            },
            token: {
                type: String,
                required: true
            },
            code: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: null
            }
        },
        passwordReset: {
            _id: false,
            token: {
                type: String,
                default: null
            },
            expiry: {
                type: Number,
                default: null
            },
            lastResetAt: {
                type: Date,
                default: null
            }
        },
        lastLoginAt: {
            type: Date,
            default: null
        },
        consent: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
)

export default mongoose.model<IUser>('user', userSchema)
