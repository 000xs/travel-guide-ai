export default function FeatureCard({ icon: Icon, title, description }) {
    return (
        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <div className="flex-shrink-0">
                <div className="p-2 bg-red-100 rounded-lg">
                    <Icon size={20} className="text-red-500" />
                </div>
            </div>
            <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    )

}

