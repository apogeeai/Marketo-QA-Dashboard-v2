const checklistData = {
    'Program & Campaigns': [
        'Program name follows naming conventions',
        'Program is filed in the correct folder',
        'Program type is correctly specified',
        'Program URL is correct and accessible',
        'Send counts align with reported counts',
    ],
    'Email': [
        'From Name is correct',
        'From Address is accurate',
        'Reply-to address is set correctly',
        'Subject line is relevant and correct',
        'Preheader text is accurate and aligned with content',
        'Tokens are included or correct information is present',
    ],
    'Lists': [
        'List count matches the reported count',
        'List upload template was used (if applicable)',
    ],
};

let emailSections = 1;

function createChecklistSection(title, items) {
    const section = document.createElement('div');
    section.className = 'border-b border-gray-200 last:border-b-0';
    section.innerHTML = `
        <h2 class="text-lg font-semibold p-4">${title}</h2>
        <ul class="p-4 space-y-2">
            ${items.map((item, index) => `
                <li class="checklist-item">
                    <input type="checkbox" id="${title.toLowerCase().replace(/\s/g, '-')}-${index}" class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <label for="${title.toLowerCase().replace(/\s/g, '-')}-${index}" class="ml-2 text-sm text-gray-700">${item}</label>
                </li>
            `).join('')}
        </ul>
    `;
    return section;
}

function renderChecklist() {
    const container = document.getElementById('checklistContainer');
    container.innerHTML = '';
    container.appendChild(createChecklistSection('Program & Campaigns', checklistData['Program & Campaigns']));
    
    const emailContainer = document.getElementById('emailSectionsContainer');
    emailContainer.innerHTML = '';
    for (let i = 1; i <= emailSections; i++) {
        emailContainer.appendChild(createChecklistSection(`Email ${i}`, checklistData['Email']));
    }
    
    container.appendChild(createChecklistSection('Lists', checklistData['Lists']));

    // Add event listeners to all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });
}

function handleCheckboxChange(event) {
    const checkbox = event.target;
    const label = checkbox.nextElementSibling;

    if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
        label.style.color = '#6b7280';
    } else {
        label.style.textDecoration = 'none';
        label.style.color = '#374151';
    }
}

document.getElementById('addEmailBtn').addEventListener('click', () => {
    emailSections++;
    renderChecklist();
    document.getElementById('removeEmailBtn').classList.remove('hidden');
});

document.getElementById('removeEmailBtn').addEventListener('click', () => {
    if (emailSections > 1) {
        emailSections--;
        renderChecklist();
        if (emailSections === 1) {
            document.getElementById('removeEmailBtn').classList.add('hidden');
        }
    }
});

document.getElementById('signOffForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const signature = document.getElementById('signature').value;
    const date = document.getElementById('date').value;
    
    if (signature && date) {
        const notification = document.getElementById('approvalNotification');
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }
});

renderChecklist();