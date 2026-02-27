import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100, 'First name must be less than 100 characters'),
  lastName: z.string().trim().min(1, 'Last name is required').max(100, 'Last name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  reason: z.string().optional(),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message must be less than 1000 characters')
});
const GetInTouchSection = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reason: '',
    message: ''
  });
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form data
      contactSchema.parse(formData);
      setIsSubmitting(true);

      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/mgvnlvpp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Success - clear form and show toast
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        reason: '',
        message: ''
      });
      toast({
        title: 'Message sent!',
        description: 'Thank you for contacting us. We\'ll get back to you soon.'
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation error',
          description: error.errors[0].message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send message. Please try again.',
          variant: 'destructive'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="bg-gray-950 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-green-400 bg-green-950 border border-green-900 rounded-full px-4 py-1.5 mb-4">
            Connect With Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Get In Touch
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-6"></div>
          <div className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed space-y-4">
            <p>Have an idea for a missing export boom or spotted something we should correct? We'd love to hear from you.</p>
            <p>
              If you're a <strong className="text-white">policymaker</strong> working to kickstart an export boom, reach out to learn how we can support your efforts.
            </p>
            <p>
              If you're a <strong className="text-white">funder</strong> committed to advancing economic prosperity in developing countries, get in touch to explore partnership opportunities.
            </p>
            <p>
              If you're a <strong className="text-white">researcher</strong> or <strong className="text-white">practitioner</strong> with evidence on an overlooked boom—data, case studies, or stories—we welcome your input to help us expand the Atlas.
            </p>
            <p>
              Together, we can strengthen the <strong className="text-white">Export Boom Atlas</strong> as a living resource for those driving export-led growth around the world.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <Input id="firstName" type="text" required value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className="w-full" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <Input id="lastName" type="text" required value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className="w-full" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input id="email" type="email" required value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="w-full" />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Contact
              </label>
              <Select onValueChange={value => handleInputChange('reason', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research Inquiry</SelectItem>
                  <SelectItem value="collaboration">Collaboration</SelectItem>
                  <SelectItem value="data">Data Request</SelectItem>
                  <SelectItem value="media">Media Inquiry</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <Textarea id="message" required rows={6} value={formData.message} onChange={e => handleInputChange('message', e.target.value)} className="w-full" placeholder="Tell us about your inquiry..." />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </div>;
};
export default GetInTouchSection;