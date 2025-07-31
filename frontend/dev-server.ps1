# PowerShell script to start Vite dev server with better process management
Write-Host "Starting Vite development server..." -ForegroundColor Green

try {
    # Start the Vite server
    $process = Start-Process -FilePath "npx" -ArgumentList "vite", "--host", "--port", "5174" -NoNewWindow -PassThru
    
    Write-Host "Server started with PID: $($process.Id)" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Cyan
    
    # Wait for the process to exit
    $process.WaitForExit()
}
catch {
    Write-Host "Error starting server: $($_.Exception.Message)" -ForegroundColor Red
}
finally {
    Write-Host "Server stopped." -ForegroundColor Green
}
