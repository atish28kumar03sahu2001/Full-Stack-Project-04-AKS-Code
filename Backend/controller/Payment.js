//backend/controller/Payment.js
import { Users } from "../model/index.js";
export const PaymentPatch = async (req, res) => {
    const { userId } = req.params;
    const { plan } = req.body;

    try {
        // Find the user by their ID
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update the userplan field
        user.userplan = plan;

        // Save the updated user document
        await user.save();

        return res.status(200).json({
            msg: 'Payment plan updated successfully',
            updatedUser: user,
        });
    } catch (error) {
        console.error('Error updating payment plan:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
}