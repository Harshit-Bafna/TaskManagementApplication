import responseMessage from '../../constants/responseMessage'
import organisationModel from '../../model/user/organisationModel'
import userModel from '../../model/user/userModel'
import argon2 from 'argon2'

export const FindUserByEmail = async (email: string, select: string = '') => {
    try {
        const user = await userModel.findOne({ emailAddress: email }).select(select)
        return user
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : responseMessage.ERROR_FETCHING('User', 'email')
        throw new Error(`Error finding user by email: ${errorMessage}`)
    }
}

export const FindUserById = async (id: string, select: string = '') => {
    try {
        const user = await userModel.findOne({ id: id }).select(select)
        return user
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : responseMessage.ERROR_FETCHING('User', 'id')
        throw new Error(`Error finding user by email: ${errorMessage}`)
    }
}

export const FindOrganisationByEmail = async (email: string) => {
    try {
        const organisation = await organisationModel.findOne({ emailAddress: email })
        return organisation
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : responseMessage.ERROR_FETCHING('Organisation', 'email')
        throw new Error(`Error finding organisation by email: ${errorMessage}`)
    }
}

export const EncryptPassword = async (password: string): Promise<string> => {
    try {
        const hashedPassword = await argon2.hash(password)
        return hashedPassword
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : responseMessage.PASSWORD_ENCRYPTION_ERROR
        throw new Error(errorMessage)
    }
}

export const VerifyPassword = async (password: string, encryptedPassword: string): Promise<boolean> => {
    try {
        const isPasswordCorrect = await argon2.verify(encryptedPassword, password)
        return isPasswordCorrect
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : responseMessage.PASSWORD_ENCRYPTION_ERROR
        throw new Error(errorMessage)
    }
}
