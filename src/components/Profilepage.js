import React, { useState } from 'react';
import { Edit, Save, User, Package, Star, ChevronDown, ChevronUp, X, MapPin, Plus } from 'lucide-react';
import '../styles/ProfilePage.css';
import userData from './userData'; // Import the user data

const ProfilePage = () => {
    // Initialize states with data from userData
    const [userInfo, setUserInfo] = useState(userData.userInfo);
    const [addresses, setAddresses] = useState(userData.addresses);
    const [orders, setOrders] = useState(userData.orders);

    // New address form state
    const [newAddress, setNewAddress] = useState({
        type: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        isDefault: false,
    });

    // Address editing states
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);

    // State for edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [editableUserInfo, setEditableUserInfo] = useState({ ...userInfo });

    // Handle edit toggle
    const handleEditToggle = () => {
        if (isEditing) {
            // Save changes
            setUserInfo(editableUserInfo);
        } else {
            // Enter edit mode
            setEditableUserInfo({ ...userInfo });
        }
        setIsEditing(!isEditing);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUserInfo({
            ...editableUserInfo,
            [name]: value
        });
    };

    // Toggle order expansion
    const toggleOrder = (orderId) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, expanded: !order.expanded } : order
        ));
    };

    // Handle review input
    const handleReviewInput = (orderId, field, value) => {
        setOrders(orders.map(order =>
            order.id === orderId
                ? { ...order, [field]: value }
                : order
        ));
    };

    // Submit review
    const submitReview = (orderId) => {
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                return {
                    ...order,
                    reviewed: true,
                    review: {
                        text: order.reviewText,
                        rating: order.rating
                    },
                    reviewText: '',
                    rating: 0
                };
            }
            return order;
        }));
    };

    // Edit existing review
    const editReview = (orderId) => {
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                return {
                    ...order,
                    reviewed: false,
                    reviewText: order.review.text,
                    rating: order.review.rating
                };
            }
            return order;
        }));
    };

    // Handle address input changes
    const handleAddressChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewAddress({
            ...newAddress,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Add a new address
    const addAddress = () => {
        const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;

        // If new address is set as default, update all other addresses
        let updatedAddresses = [...addresses];
        if (newAddress.isDefault) {
            updatedAddresses = updatedAddresses.map(addr => ({
                ...addr,
                isDefault: false
            }));
        }

        // Only set as default if it's the first address
        const isDefaultAddress = newAddress.isDefault || addresses.length === 0;

        setAddresses([
            ...updatedAddresses,
            {
                ...newAddress,
                id: newId,
                isDefault: isDefaultAddress
            }
        ]);

        // Reset the form
        setNewAddress({
            type: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            isDefault: false,
        });

        setIsAddingAddress(false);
    };

    // Start editing an address
    const startEditAddress = (id) => {
        const addressToEdit = addresses.find(addr => addr.id === id);
        if (addressToEdit) {
            setNewAddress({ ...addressToEdit });
            setEditingAddressId(id);
            setIsAddingAddress(true);
        }
    };

    // Save edited address
    const saveEditedAddress = () => {
        // If edited address is set as default, update all other addresses
        let updatedAddresses = addresses.map(addr => {
            if (addr.id === editingAddressId) {
                return { ...newAddress, id: editingAddressId };
            }
            if (newAddress.isDefault) {
                return { ...addr, isDefault: false };
            }
            return addr;
        });

        setAddresses(updatedAddresses);
        setNewAddress({
            type: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            isDefault: false,
        });
        setEditingAddressId(null);
        setIsAddingAddress(false);
    };

    // Delete an address
    const deleteAddress = (id) => {
        const addressToDelete = addresses.find(addr => addr.id === id);
        let updatedAddresses = addresses.filter(addr => addr.id !== id);

        // If we're deleting the default address, set the first remaining address as default
        if (addressToDelete.isDefault && updatedAddresses.length > 0) {
            updatedAddresses = updatedAddresses.map((addr, index) => ({
                ...addr,
                isDefault: index === 0
            }));
        }

        setAddresses(updatedAddresses);
    };

    // Set an address as default
    const setDefaultAddress = (id) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    // Cancel address editing/adding
    const cancelAddressEdit = () => {
        setNewAddress({
            type: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            isDefault: false,
        });
        setEditingAddressId(null);
        setIsAddingAddress(false);
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1>My Profile</h1>
            </div>

            <div className="profile-container">
                <div className="profile-section user-info">
                    <div className="section-header">
                        <h2><User size={20} /> Personal Information</h2>
                        <button className="icon-button" onClick={handleEditToggle}>
                            {isEditing ? <Save size={18} /> : <Edit size={18} />}
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>
                    <div className="user-details">
                        {isEditing ? (
                            <form>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editableUserInfo.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editableUserInfo.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={editableUserInfo.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </form>
                        ) : (
                            <div className="info-display">
                                <div className="info-item">
                                    <span className="info-label">Name:</span>
                                    <span className="info-value">{userInfo.name}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Email:</span>
                                    <span className="info-value">{userInfo.email}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Password:</span>
                                    <span className="info-value">{userInfo.password}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Addresses Section */}
                <div className="profile-section addresses">
                    <div className="section-header">
                        <h2><MapPin size={20} /> My Addresses</h2>
                        {!isAddingAddress && (
                            <button className="icon-button" onClick={() => setIsAddingAddress(true)}>
                                <Plus size={18} /> Add New
                            </button>
                        )}
                    </div>

                    {isAddingAddress ? (
                        <div className="address-form">
                            <h3>{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
                            <form>
                                <div className="form-group">
                                    <label>Address Type</label>
                                    <input
                                        type="text"
                                        name="type"
                                        placeholder="Home, Office, etc."
                                        value={newAddress.type}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Street Address</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={newAddress.street}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group" >
                                        <label>City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={newAddress.city}
                                            onChange={handleAddressChange}
                                            style={{ width: '90%' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={newAddress.state}
                                            onChange={handleAddressChange}
                                            style={{ width: '96%' }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>ZIP/Postal Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        value={newAddress.zip}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div className="form-group checkbox">
                                    <input
                                        type="checkbox"
                                        id="isDefault"
                                        name="isDefault"
                                        checked={newAddress.isDefault}
                                        onChange={handleAddressChange}
                                    />
                                    <label htmlFor="isDefault">Set as default address</label>
                                </div>
                                <div className="form-buttons">
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={cancelAddressEdit}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="submit-btn"
                                        onClick={editingAddressId ? saveEditedAddress : addAddress}
                                        disabled={!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zip}
                                    >
                                        {editingAddressId ? 'Update Address' : 'Add Address'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <>
                            <div className="addresses-list" style={{
                                height: '320px',
                                overflowY: 'auto',
                                padding: '0 4px'
                            }}>
                                {addresses.length > 0 ? (
                                    addresses.map(address => (
                                        <div key={address.id} className={`address-card ${address.isDefault ? 'default-address' : ''}`}>
                                            {address.isDefault && <span className="default-badge">Default</span>}
                                            <div className="address-type">{address.type}</div>
                                            <div className="address-details">
                                                <p>{address.street}</p>
                                                <p>{address.city}, {address.state} {address.zip}</p>
                                            </div>
                                            <div className="address-actions">
                                                {!address.isDefault && (
                                                    <button
                                                        className="default-btn"
                                                        onClick={() => setDefaultAddress(address.id)}
                                                    >
                                                        Set as Default
                                                    </button>
                                                )}
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => startEditAddress(address.id)}
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => deleteAddress(address.id)}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-addresses">You haven't added any addresses yet.</p>
                                )}
                            </div>
                            {addresses.length > 2 && (
                                <div className="scroll-indicator" style={{
                                    textAlign: 'center',
                                    fontSize: '0.8rem',
                                    color: '#777',
                                    marginTop: '8px'
                                }}>
                                    Scroll to see more addresses
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>
            <div className="profile-section order-history">
                <div className="section-header">
                    <h2><Package size={20} /> Order History</h2>
                </div>
                {orders.length > 0 ? (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-summary" onClick={() => toggleOrder(order.id)}>
                                    <div className="order-basic-info">
                                        <h3>Order #{order.id}</h3>
                                        <span className="order-date">{order.date}</span>
                                    </div>
                                    <div className="order-status-price">
                                        <span className="order-status">{order.status}</span>
                                        <span className="order-total">₹{order.total.toFixed(2)}</span>
                                    </div>
                                    <button className="expand-button">
                                        {order.expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button>
                                </div>

                                {order.expanded && (
                                    <div className="order-details">
                                        <h4>Items</h4>
                                        <ul className="order-items">
                                            {order.items.map((item, index) => (
                                                <li key={index}>
                                                    <span className="item-name">{item.name}</span>
                                                    <span className="item-quantity">x{item.quantity}</span>
                                                    <span className="item-price">₹{item.price.toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="order-review-section">
                                            <h4>Review</h4>
                                            {order.reviewed ? (
                                                <div className="review-display">
                                                    <div className="review-rating">
                                                        {[1, 2, 3, 4, 5].map(star => (
                                                            <Star
                                                                key={star}
                                                                size={18}
                                                                fill={star <= order.review.rating ? "#FFD700" : "none"}
                                                                stroke="#FFD700"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="review-text">{order.review.text}</p>
                                                    <button className="review-edit-btn" onClick={() => editReview(order.id)}>
                                                        <Edit size={16} /> Edit Review
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="review-form">
                                                    <div className="rating-selector">
                                                        {[1, 2, 3, 4, 5].map(star => (
                                                            <Star
                                                                key={star}
                                                                size={24}
                                                                fill={star <= order.rating ? "#FFD700" : "none"}
                                                                stroke="#FFD700"
                                                                onClick={() => handleReviewInput(order.id, 'rating', star)}
                                                                className="star-icon"
                                                            />
                                                        ))}
                                                    </div>
                                                    <textarea
                                                        placeholder="Write your review..."
                                                        value={order.reviewText || ''}
                                                        onChange={(e) => handleReviewInput(order.id, 'reviewText', e.target.value)}
                                                    ></textarea>
                                                    <button
                                                        className="submit-review-btn"
                                                        onClick={() => submitReview(order.id)}
                                                        disabled={!order.rating || !order.reviewText}
                                                    >
                                                        Submit Review
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-orders">You haven't placed any orders yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;