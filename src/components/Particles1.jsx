import React, { useRef, useEffect } from 'react'

const Particles1 = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    // Create particles
    const particles = []
    const particleCount = 80

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 242, 255, ${particle.opacity})`
        ctx.fill()

        // Draw connections
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 242, 255, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 0.8
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particles-canvas" />
}

export default Particles1