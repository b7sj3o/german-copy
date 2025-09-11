// Image Modal functionality for teacher photos

// Function to open image modal
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
}

// Function to close image modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scroll
    }
}

// Initialize image modal functionality
function initializeImageModal() {
    // Add mouse event handlers to all teacher images
    const teacherItems = document.querySelectorAll('.teacher-clickable');
    
    teacherItems.forEach(item => {
        let mouseDownPosition = null;
        let mouseUpPosition = null;
        
        // Track mouse down position
        item.addEventListener('mousedown', function(event) {
            mouseDownPosition = {
                x: event.clientX,
                y: event.clientY
            };
        });
        
        // Track mouse up position and check if it's a click (not a drag)
        item.addEventListener('mouseup', function(event) {
            mouseUpPosition = {
                x: event.clientX,
                y: event.clientY
            };
            
            // Calculate distance between mousedown and mouseup
            if (mouseDownPosition && mouseUpPosition) {
                const deltaX = Math.abs(mouseUpPosition.x - mouseDownPosition.x);
                const deltaY = Math.abs(mouseUpPosition.y - mouseDownPosition.y);
                
                // Only open modal if movement is less than 10px in both directions
                if (deltaX <= 10 && deltaY <= 10) {
                    const imageSrc = this.getAttribute('data-image');
                    if (imageSrc) {
                        openImageModal(imageSrc);
                    }
                }
            }
            
            // Reset positions
            mouseDownPosition = null;
            mouseUpPosition = null;
        });
        
        // Handle mouse leave (in case user drags outside the element)
        item.addEventListener('mouseleave', function() {
            mouseDownPosition = null;
            mouseUpPosition = null;
        });
        
        // Add touch support for mobile devices
        let touchStartPosition = null;
        let touchEndPosition = null;
        
        // Track touch start position
        item.addEventListener('touchstart', function(event) {
            const touch = event.touches[0];
            touchStartPosition = {
                x: touch.clientX,
                y: touch.clientY
            };
        }, { passive: true });
        
        // Track touch end position and check if it's a tap (not a swipe)
        item.addEventListener('touchend', function(event) {
            event.preventDefault(); // Prevent default touch behavior
            
            if (event.changedTouches.length > 0) {
                const touch = event.changedTouches[0];
                touchEndPosition = {
                    x: touch.clientX,
                    y: touch.clientY
                };
                
                // Calculate distance between touchstart and touchend
                if (touchStartPosition && touchEndPosition) {
                    const deltaX = Math.abs(touchEndPosition.x - touchStartPosition.x);
                    const deltaY = Math.abs(touchEndPosition.y - touchStartPosition.y);
                    
                    console.log('Touch movement:', deltaX, deltaY); // Debug log
                    
                    // Only open modal if movement is less than 10px in both directions
                    if (deltaX <= 10 && deltaY <= 10) {
                        const imageSrc = this.getAttribute('data-image');
                        console.log('Opening modal with image:', imageSrc); // Debug log
                        if (imageSrc) {
                            openImageModal(imageSrc);
                        }
                    } else {
                        console.log('Movement too large, not opening modal'); // Debug log
                    }
                }
                
                // Reset positions
                touchStartPosition = null;
                touchEndPosition = null;
            }
        });
        
        // Alternative approach: use a flag to track if we should handle click
        let shouldHandleClick = false;
        let clickTimeout = null;
        
        // Set flag after touchend if it was a tap
        item.addEventListener('touchend', function(event) {
            // Clear any existing timeout
            if (clickTimeout) {
                clearTimeout(clickTimeout);
            }
            
            // Set timeout to allow click if it was a tap
            clickTimeout = setTimeout(() => {
                shouldHandleClick = true;
                // Reset flag after a short delay
                setTimeout(() => {
                    shouldHandleClick = false;
                }, 100);
            }, 50);
        });
        
        // Simple click handler that works for both desktop and mobile
        item.addEventListener('click', function(event) {
            // For desktop (no touch support) or mobile after tap detection
            if (!('ontouchstart' in window) || shouldHandleClick) {
                event.preventDefault();
                const imageSrc = this.getAttribute('data-image');
                console.log('Click handler activated:', imageSrc); // Debug log
                if (imageSrc) {
                    openImageModal(imageSrc);
                }
                shouldHandleClick = false; // Reset flag
            }
        });
    });
    
    // Close modal when clicking outside the image or on the image itself
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal || event.target.classList.contains('image-modal-overlay')) {
                closeImageModal();
            }
        });
    }
    
    // Close modal when clicking on the image itself
    if (modalImage) {
        modalImage.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event bubbling
            closeImageModal();
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeImageModal();
        }
    });
    
    console.log('Image modal functionality initialized');
    console.log('Found teacher items:', teacherItems.length);
    console.log('Touch support:', 'ontouchstart' in window ? 'Yes' : 'No');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeImageModal();
});
