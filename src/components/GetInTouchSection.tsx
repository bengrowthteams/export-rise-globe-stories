
import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const GetInTouchSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reason: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div id="get-in-touch-section" className="bg-gradient-to-br from-gray-50 via-white to-green-50/30 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Get in touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Introduction Text */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-sm mr-4">
              <MessageSquare className="text-white" size={20} />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent">Connect with us</h3>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Want to request the raw data for research purposes? See an error in a case study you'd like to correct? Notice a case you think is missing? Have a suggestion for how we can improve this tool? Interested in collaborating with us?
              </p>
              <p>
                We are also continually looking for motivated colleagues to work with us, aligned funders interested in a new approach, and progressive policymakers and political leaders who want to "build the muscle" of their government to drive economic diversification and growth.
              </p>
              <p>
                Get in touch with us to request data, submit a correction or suggestion, learn more about our work, to explore a new government engagement, or to get involved yourself.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm mr-4">
              <Send className="text-white" size={20} />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">Contact Form</h3>
          </div>
          
          <Card className="bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent">
                      First Name *
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent">
                      Last Name *
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="reason" className="text-sm font-medium bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent">
                    Reason for Contact *
                  </label>
                  <Select onValueChange={(value) => handleInputChange('reason', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Select a reason for contact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="submit-correction">Submit correction</SelectItem>
                      <SelectItem value="request-data">Request data</SelectItem>
                      <SelectItem value="explore-collaboration">Explore collaboration/partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500 min-h-[120px]"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default GetInTouchSection;
