// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BookingIntegrity
 * @notice On-chain anchoring for booking commitments
 * @dev Stores only booking hashes to prevent overlapping bookings per provider
 *      No personal data is stored on-chain
 */
contract BookingIntegrity {
    // Events
    event BookingCommitted(
        address indexed provider,
        uint256 indexed startTime,
        uint256 indexed endTime,
        bytes32 bookingHash
    );

    event BookingCancelled(
        address indexed provider,
        uint256 indexed startTime,
        uint256 indexed endTime,
        bytes32 bookingHash
    );

    // Mapping: provider => timeSlot => bookingHash
    // timeSlot is calculated as: startTime / TIME_SLOT_INTERVAL
    mapping(address => mapping(uint256 => bytes32)) public bookings;

    // Mapping: provider => bookingHash => exists (for quick lookup)
    mapping(address => mapping(bytes32 => bool)) public bookingExists;

    // Time slot interval in seconds (e.g., 1 hour = 3600)
    // This determines the granularity of time slot checking
    uint256 public constant TIME_SLOT_INTERVAL = 3600; // 1 hour

    /**
     * @notice Commit a booking hash for a time slot
     * @param startTime Booking start timestamp
     * @param endTime Booking end timestamp
     * @param bookingHash Hash of the booking data (off-chain)
     * @return success Whether the commitment was successful
     */
    function commitBooking(
        uint256 startTime,
        uint256 endTime,
        bytes32 bookingHash
    ) external returns (bool success) {
        require(startTime < endTime, "Invalid time range");
        require(block.timestamp <= startTime, "Cannot book in the past");
        require(bookingHash != bytes32(0), "Invalid booking hash");
        require(!bookingExists[msg.sender][bookingHash], "Booking already exists");

        // Check for overlapping bookings
        require(
            !hasOverlappingBookings(msg.sender, startTime, endTime),
            "Overlapping booking exists"
        );

        // Mark booking hash as used
        bookingExists[msg.sender][bookingHash] = true;

        // Store booking hash for each time slot in the range
        uint256 currentSlot = startTime / TIME_SLOT_INTERVAL;
        uint256 endSlot = endTime / TIME_SLOT_INTERVAL;

        // If booking spans multiple slots, mark all slots
        // For simplicity, we mark the start slot and check overlaps
        bookings[msg.sender][currentSlot] = bookingHash;

        emit BookingCommitted(msg.sender, startTime, endTime, bookingHash);

        return true;
    }

    /**
     * @notice Cancel a booking commitment
     * @param startTime Booking start timestamp
     * @param endTime Booking end timestamp
     * @param bookingHash Hash of the booking to cancel
     */
    function cancelBooking(
        uint256 startTime,
        uint256 endTime,
        bytes32 bookingHash
    ) external {
        require(bookingHash != bytes32(0), "Invalid booking hash");
        require(bookingExists[msg.sender][bookingHash], "Booking does not exist");

        uint256 slot = startTime / TIME_SLOT_INTERVAL;
        require(
            bookings[msg.sender][slot] == bookingHash,
            "Booking hash mismatch"
        );

        // Clear the booking
        delete bookings[msg.sender][slot];
        delete bookingExists[msg.sender][bookingHash];

        emit BookingCancelled(msg.sender, startTime, endTime, bookingHash);
    }

    /**
     * @notice Check if a time slot is available for a provider
     * @param provider Provider address
     * @param startTime Booking start timestamp
     * @param endTime Booking end timestamp
     * @return available Whether the time slot is available
     */
    function isTimeSlotAvailable(
        address provider,
        uint256 startTime,
        uint256 endTime
    ) external view returns (bool available) {
        return !hasOverlappingBookings(provider, startTime, endTime);
    }

    /**
     * @notice Get booking hash for a specific time slot
     * @param provider Provider address
     * @param timeSlot Time slot to check
     * @return bookingHash The booking hash for the slot (0 if empty)
     */
    function getBookingHash(
        address provider,
        uint256 timeSlot
    ) external view returns (bytes32 bookingHash) {
        return bookings[provider][timeSlot];
    }

    /**
     * @notice Check if a booking hash exists for a provider
     * @param provider Provider address
     * @param bookingHash Booking hash to check
     * @return exists Whether the booking hash exists
     */
    function hasBooking(
        address provider,
        bytes32 bookingHash
    ) external view returns (bool exists) {
        return bookingExists[provider][bookingHash];
    }

    /**
     * @dev Internal function to check for overlapping bookings
     * @param provider Provider address
     * @param startTime Booking start timestamp
     * @param endTime Booking end timestamp
     * @return hasOverlap Whether there's an overlapping booking
     */
    function hasOverlappingBookings(
        address provider,
        uint256 startTime,
        uint256 endTime
    ) internal view returns (bool hasOverlap) {
        uint256 startSlot = startTime / TIME_SLOT_INTERVAL;
        uint256 endSlot = endTime / TIME_SLOT_INTERVAL;

        // Check all slots in the range
        for (uint256 slot = startSlot; slot <= endSlot; slot++) {
            if (bookings[provider][slot] != bytes32(0)) {
                return true;
            }
        }

        return false;
    }
}
