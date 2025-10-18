// Main JavaScript for Clean My Mtaa

document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission for report page
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const location = document.getElementById('location').value;
            const description = document.getElementById('description').value;
            const photo = document.getElementById('photo').files[0];
            
            // Simple validation
            if (!location || !description) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Simulate form submission
            const submissionData = {
                location: location,
                description: description,
                photo: photo ? photo.name : 'No photo uploaded',
                timestamp: new Date().toLocaleString()
            };
            
            // Show success message
            alert('Thank you for your report! We will review it and take action.\n\n' +
                  `Location: ${submissionData.location}\n` +
                  `Description: ${submissionData.description}\n` +
                  `Submitted: ${submissionData.timestamp}`);
            
            // Reset form
            reportForm.reset();
        });
    }
    
    // Add interactivity to map points
    const mapPoints = document.querySelectorAll('.map-point');
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            alert(`Reported issue in ${location}. Click "Report" to add your own report.`);
        });
    });
    
    // Simple image preview for file upload
    const photoInput = document.getElementById('photo');
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // In a real app, you would create a preview here
                console.log('Photo selected:', file.name);
            }
        });
    }
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.type === 'submit' || this.href) {
                // Add loading animation
                this.style.opacity = '0.7';
                this.style.cursor = 'wait';
                
                // Remove loading state after 2 seconds (simulate processing)
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.cursor = 'pointer';
                }, 2000);
            }
        });
    });
    
    // Simple animation for feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards and tip cards
    const cards = document.querySelectorAll('.feature-card, .tip-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Utility function for geolocation (for future enhancement)
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                console.log('Location:', position.coords.latitude, position.coords.longitude);
                // In a real app, you would use this to auto-fill the location field
            },
            function(error) {
                console.log('Geolocation error:', error);
            }
        );
    }
}