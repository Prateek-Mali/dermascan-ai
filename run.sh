#!/bin/bash
set -e

# Get the directory where this script is located
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🩺 Starting DermaScan AI..."
echo ""

# Check if venv exists, if not create it
if [ ! -d "$PROJECT_DIR/backend/venv" ]; then
    echo "📦 Setting up virtual environment..."
    cd "$PROJECT_DIR/backend"
    python3 -m venv venv
    source venv/bin/activate
    echo "📥 Installing dependencies..."
    pip install -q -r requirements.txt
    echo "✓ Setup complete!"
    echo ""
else
    cd "$PROJECT_DIR/backend"
    source venv/bin/activate
fi

echo "🚀 Starting Flask server..."
echo ""
echo "════════════════════════════════════════════"
echo "✅ Server is running!"
echo "📱 Open your browser and visit:"
echo "   👉 http://127.0.0.1:5001"
echo "════════════════════════════════════════════"
echo ""

python3 app.py
