import { colors } from '~/material'

interface PasswordComplexityBarProps {
  complexity: number
}

export default function passwordComplexityBar({ complexity } : PasswordComplexityBarProps) {
  const getPercentage = (complexity: number): string => {
    switch (complexity) {
    case 1:
      return '5%' // Very weak
    case 2:
      return '20%' // Weak
    case 3:
      return '40%' // Medium
    case 4:
      return '85%' // Strong
    case 5:
      return '100%' // Very strong
    default:
      return '0%'
    }
  }

  // Determine color based on complexity level
  const getColor = (complexity: number): string => {
    switch (complexity) {
    case 1:
      return '#F4432C' // Red
    case 2:
      return '#F4432C' // Red
    case 3:
      return '#FF6D00' // Orange
    case 4:
      return '#2ECC40' // Green
    case 5:
      return colors.secondary // Blue
    default:
      return '#eee' // Default gray
    }
  }

  // Determine complexity level label
  const getLabel = (complexity: number): string => {
    switch (complexity) {
    case 1:
      return 'Very weak' // Red
    case 2:
      return 'Weak' // Orange
    case 3:
      return 'Medium' // Yellow
    case 4:
      return 'Strong' // Green
    case 5:
      return 'Very strong' // Blue
    default:
      return '' // Default gray
    }
  }

  return (
    <div className="w-full flex flex-col items-start">
      {/* The bar */}
      <div
        className='relative w-full rounded-md'
        style={{ marginBottom: '4px', height: '2px', backgroundColor: '#eee' }}
      >
        <div
          style={{
            width: getPercentage(complexity),
            height: '100%',
            backgroundColor: getColor(complexity),
            position: 'absolute',
            top: '0',
            left: '0',
            borderRadius: '4px',
            transition: 'width 0.3s ease-in-out'
          }}
        />
      </div>
      {/* Complexity label */}
      <span className='text-sm font-medium ml-1' style={{ color: getColor(complexity) }}>{getLabel(complexity)}</span>
    </div>
  )
}